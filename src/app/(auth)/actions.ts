"use server";
import { redirect } from "next/navigation";

export async function getUser() {
  // TODO: Implement authentication
  return null;
}

export async function signIn(email: string, password: string) {
  // TODO: Implement authentication
  throw new Error("Authentication not implemented");
}

export async function signOut() {
  // TODO: Implement authentication
}
