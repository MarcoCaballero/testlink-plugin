package com.marco.tlp.test.api;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

import org.junit.Test;

public class LoginApiTest {

	private String TESTLINK_SERVER_URL = "http://172.18.0.1:80/lib/api/xmlrpc/v1/xmlrpc.php";
	private String API_KEY_GOOD = "0c4eae230736ccd923409b3e144165a1";
	private String API_KEY_BAD = "BAD_BAD_bad";

	@Test
	public void loginSuccessTest() {
		given().headers("TLP-Server-Url", TESTLINK_SERVER_URL, "TLP-Api-Key", API_KEY_GOOD).when()
				.get("/tlp-api/authorization").then().statusCode(200).body("url", equalTo(TESTLINK_SERVER_URL))
				.body("result", equalTo("true"));
	}

	@Test
	public void loginFailTest() {
		given().headers("TLP-Server-Url", TESTLINK_SERVER_URL, "TLP-Api-Key", API_KEY_BAD).when()
				.get("/tlp-api/authorization").then().statusCode(401).body("url", equalTo(TESTLINK_SERVER_URL))
				.body("result", equalTo("false"));
	}
}