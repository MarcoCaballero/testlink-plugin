package com.marco.tlp.test.api;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

public class LoginApiTest {
	
	private String TESTLINK_SERVER_URL = "http://localhost:80/testlink/lib/api/xmlrpc/v1/xmlrpc.php";
	private String API_KEY_GOOD = "65330eb0c5e8424b696dee2bb5d60fc1";
	private String API_KEY_BAD= "BAD_BAD_bad";
	
	@BeforeClass
	public static void setup() {
		// RestApp.start();
	}

	@AfterClass
	public static void teardown() {
		// RestApp.stop();
	}

	@Test
	public void loginSuccessTest() {
		given()
			.headers("TLP-Server-Url", TESTLINK_SERVER_URL,
					"TLP-Api-Key",	API_KEY_GOOD)
		.when()
			.get("/tlp-api/authorization")
		.then()
			.statusCode(200)
			.body("url", equalTo(TESTLINK_SERVER_URL))
			.body("result", equalTo("true"));
	}

	@Test
	public void loginFailTest() {
		given()
			.headers("TLP-Server-Url", TESTLINK_SERVER_URL,
					"TLP-Api-Key",	API_KEY_BAD)
		.when()
			.get("/tlp-api/authorization")
		.then()
			.statusCode(401)
			.body("url", equalTo(TESTLINK_SERVER_URL))
			.body("result", equalTo("false"));
	}
}