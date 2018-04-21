package com.marco.tlp.test.unit;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.marco.tlp.api.AuthRestController;
import com.marco.tlp.models.Plugin;
import com.marco.tlp.services.AuthService;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@WebMvcTest(AuthRestController.class)
public class LoginApiUTest {

    private String TESTLINK_SERVER_URL = "http://172.18.0.1:80/lib/api/xmlrpc/v1/xmlrpc.php";
    private String API_KEY_GOOD = "0c4eae230736ccd923409b3e144165a1";
    private String API_KEY_BAD = "BAD_BAD_bad";

    @Autowired
    private MockMvc mvc;
    @MockBean
    private AuthService mockAuthservice;
    @MockBean
    private Plugin mockPlugin;

    @Test
    public void successful_login() throws Exception {
        // List<User> users = Arrays.asList(new User("John"), new User("Peter"));
        when(mockAuthservice.isAuthorized(TESTLINK_SERVER_URL, API_KEY_GOOD)).thenReturn(true);
        mvc.perform(get("/tlp-api/authorization").header("TLP-Server-Url", TESTLINK_SERVER_URL)
                .header("TLP-Api-Key", API_KEY_GOOD).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void unauthorized_login_no_key() throws Exception {
        when(mockAuthservice.isAuthorized(TESTLINK_SERVER_URL, API_KEY_BAD)).thenReturn(false);
        mvc.perform(get("/tlp-api/authorization").header("TLP-Server-Url", TESTLINK_SERVER_URL)
                .header("TLP-Api-Key", API_KEY_GOOD).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }
}
