//helper functions - DynamoDB 

import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, PutCommand, DynamoDBDocumentClient, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import crypto from 'crypto';

const client = new DynamoDBClient({ region: "eu-west-1"});
const docClient = DynamoDBDocumentClient.from(client);

export const fetchTasks = async() => {
  //when you want to fetch all the data - scan
  const command = new ScanCommand({
    ExpressionAttributeNames: { "#name": "name"},
    //this is what attributes we want to get back
    ProjectionExpression: "id, #name, completed",
    TableName: "Tasks",

  });
  
  const response = await docClient.send(command);

  return response;
}

export const createTasks = async( {name, completed}) => {
  const uuid = crypto.randomUUID()

  const command = new PutCommand({
    TableName: "Tasks",
    Item: {
      id: uuid, //partition key - should be unique
      name,
      completed
    }
  })

  const response = await docClient.send(command);

  return response;
};

export const updateTasks = async({id, name, completed}) => {

  const command = new UpdateCommand( {
    TableName: "Tasks",
    Key: {
      id
    },
    ExpressionAttributeNames: {
      "#name": "name"
    },
    UpdateExpression: "set #name = :n, completed = :c",
    ExpressionAttributeValues: {
      ":n": name,
      ":c": completed
    },
    ReturnValues: "ALL_NEW"
  });

  const response = await docClient.send(command);

  return response;
};

export const deleteTasks = async( id ) => {
  
  const command = new DeleteCommand({
    TableName: "Tasks",
    Key: {
      id,},
  })

  const response = await docClient.send(command);

  return response;
};