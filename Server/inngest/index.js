import { Inngest } from "inngest";
import prisma from "../config/prisma.js";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "my-app",
});

const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-creation",
    name: "Sync User Creation",
    triggers: {
      event: "clerk.user.created",
    },
  },
  async ({ event, step }) => {
    const { data } = event;

    await prisma.user.create({
      data: {
        id: data.id,
        email: data.email,
        name: `${data.first_name} ${data.last_name}`,
      },
    });
  },
);

const syncUserDeletion = inngest.createFunction(
  {
    id: "sync-user-deletion",
    name: "Sync User Deletion",
    triggers: {
      event: "clerk.user.created",
    },
  },
  async ({ event, step }) => {
    const { data } = event;

    await prisma.user.delete({
      where: {
        id: data.id,
        
      },
    });
  },
);

const syncUserUpdate = inngest.createFunction(
  {
    id: "sync-user-update",
    name: "Sync User Update",
    triggers: {
      event: "clerk.user.updated",
    },
  },
  async ({ event, step }) => {
    const { data } = event;

    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        email: data.email,
        name: `${data.first_name} ${data.last_name}`,
      },
    });
  },
);

export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdate];
