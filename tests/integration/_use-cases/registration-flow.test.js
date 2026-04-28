import password from "models/password";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
  await orchestrator.deleteAllEmails();
});

describe("Use case: Registration flow  (all succesfull)", () => {
    test("Create user account", async () => {
      const createUserResponse = await fetch("http://localhost:3000/api/v1/users",
      {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: "Registration flow",
            email: "registration.flow@curso.dev",
            password: "Registrationflowpass"
        })
      }
      );
      expect(createUserResponse.status).toBe(201);

      const createUserResponseBody = await createUserResponse.json();

      expect(createUserResponseBody).toEqual({
        id: createUserResponseBody.id,
        username: "Registration flow",
        email: "registration.flow@curso.dev",
        features: ["read:activation_token"],
        password: createUserResponseBody.password,
        created_at: createUserResponseBody.created_at,
        updated_at: createUserResponseBody.updated_at,
      })
    });

    test("Receive activation email", async () => {})

    test("Activation account", async () => {})

    test("Login", async () => {})

    test("Get user information", async () => {})

});