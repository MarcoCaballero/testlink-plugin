package com.marco.tlp.test.unit;

import static org.mockito.Matchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import com.marco.tlp.api.TestPlanRestController;
import com.marco.tlp.models.Plugin;
import com.marco.tlp.services.TestPlanService;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import br.eti.kinoshita.testlinkjavaapi.model.Platform;
import br.eti.kinoshita.testlinkjavaapi.model.TestPlan;

@RunWith(SpringRunner.class)
@WebMvcTest(TestPlanRestController.class)
public class TestPlanRestUTest {

    private String TESTLINK_SERVER_URL = "http://172.18.0.1:80/lib/api/xmlrpc/v1/xmlrpc.php";
    private String API_KEY_GOOD = "0c4eae230736ccd923409b3e144165a1";

    @Autowired
    private MockMvc mvc;
    @MockBean
    private TestPlanService testPlanService;
    @MockBean
    private Plugin plugin;

    @Test
    public void get_testplans_ok() throws Exception {
        TestPlan t1 = new TestPlan(2, "Backend TestPlan", null,
                "<p>Test Plan about TestLink-Plugin-Rest deployment on Docker.</p>", true, true);
        TestPlan t2 = new TestPlan(3, "FrontEnd TestPlan", null,
                "<p>Test Plan for tlp-api-gui frontend deployment with multi-stage Dockerfile.</p>", true, true);
        List<TestPlan> users = Arrays.asList(t1, t2);

        when(testPlanService.getProjectTestPlans(anyInt())).thenReturn(users);

        mvc.perform(get("/tlp-api/testproject/1/testplans").header("TLP-Server-Url", TESTLINK_SERVER_URL)
                .header("TLP-Api-Key", API_KEY_GOOD)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(2))
                .andExpect(jsonPath("$[0].name").value("Backend TestPlan"))
                .andExpect(jsonPath("$[0].public").value(true)).andExpect(jsonPath("$[1].id").value(3))
                .andExpect(jsonPath("$[1].name").value("FrontEnd TestPlan"))
                .andExpect(jsonPath("$[1].public").value(true));
    }

    @Test
    public void get_testplans_notFound() throws Exception {

        when(testPlanService.getProjectTestPlans(anyInt())).thenReturn(null);

        mvc.perform(get("/tlp-api/testproject/1/testplans")
                .header("TLP-Server-Url", TESTLINK_SERVER_URL)
                .header("TLP-Api-Key", API_KEY_GOOD)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void get_testplatforms_ok() throws Exception {
        Platform p1 = new Platform(4, "Ubuntu 16.04", "<p>Ubuntu version 16.04 Xenial LTS</p>");
        Platform p2 = new Platform(5, "Ubuntu 17.10", "<p>Ubuntu 17.10 ArtFul (Non-LTS)</p>");

        List<Platform> platforms = Arrays.asList(p1, p2);

        when(testPlanService.getTestPlanPlatforms(anyInt())).thenReturn(platforms);

        mvc.perform(get("/tlp-api/testplan/1/platforms").header("TLP-Server-Url", TESTLINK_SERVER_URL)
                .header("TLP-Api-Key", API_KEY_GOOD).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON)).andExpect(jsonPath("$[0].id").value(4))
                .andExpect(jsonPath("$[0].name").value("Ubuntu 16.04"))
                .andExpect(jsonPath("$[0].notes").value("<p>Ubuntu version 16.04 Xenial LTS</p>"))
                .andExpect(jsonPath("$[1].id").value(5)).andExpect(jsonPath("$[1].name").value("Ubuntu 17.10"))
                .andExpect(jsonPath("$[1].notes").value("<p>Ubuntu 17.10 ArtFul (Non-LTS)</p>"));

    }

    @Test
    public void get_testplatforms_notFound() throws Exception {

        when(testPlanService.getTestPlanPlatforms(anyInt())).thenReturn(null);

        mvc.perform(get("/tlp-api/testplan/1/platforms")
                .header("TLP-Server-Url", TESTLINK_SERVER_URL)
                .header("TLP-Api-Key", API_KEY_GOOD)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

    }
}
