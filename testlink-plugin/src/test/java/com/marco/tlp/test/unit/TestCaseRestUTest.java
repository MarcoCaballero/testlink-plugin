package com.marco.tlp.test.unit;

import static org.mockito.Matchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.marco.tlp.api.TestCaseRestController;
import com.marco.tlp.models.Plugin;
import com.marco.tlp.services.TestCaseService;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import br.eti.kinoshita.testlinkjavaapi.constants.ExecutionType;
import br.eti.kinoshita.testlinkjavaapi.constants.TestImportance;
import br.eti.kinoshita.testlinkjavaapi.model.TestCase;
import br.eti.kinoshita.testlinkjavaapi.model.TestCaseStep;

@RunWith(SpringRunner.class)
@WebMvcTest(TestCaseRestController.class)
public class TestCaseRestUTest {

    private String TESTLINK_SERVER_URL = "http://172.18.0.1:80/lib/api/xmlrpc/v1/xmlrpc.php";
    private String API_KEY_GOOD = "0c4eae230736ccd923409b3e144165a1";

    @Autowired
    private MockMvc mvc;
    @MockBean
    private TestCaseService testCaseService;
    @MockBean
    private Plugin plugin;

    private List<TestCase> getTestCases() {
        List<TestCaseStep> steps = new ArrayList<TestCaseStep>();
        TestCaseStep step = new TestCaseStep();
        step.setNumber(1);
        step.setExpectedResults("Expected 1");
        step.setExecutionType(ExecutionType.AUTOMATED);
        step.setActions("Actions 1");
        steps.add(step);
        TestCaseStep step2 = new TestCaseStep();
        step2.setNumber(2);
        step2.setExpectedResults("Expected 2");
        step2.setExecutionType(ExecutionType.AUTOMATED);
        step2.setActions("Actions 2");
        steps.add(step2);

        TestCase t1 = new TestCase(100, "name1", null, 2, null, "summary1", steps, "preconditions1", null, null,
                ExecutionType.AUTOMATED, null, null, null, null, null, null, null, 1, null, null, null, null, null);
        TestCase t2 = new TestCase(101, "name2", null, 2, null, "summary2", steps, "preconditions2", null, null,
                ExecutionType.AUTOMATED, null, null, null, null, null, null, null, 1, null, null, null, null, null);

        return Arrays.asList(t1, t2);
    }

    @Test
    public void get_testcases_for_testplan() throws Exception {
        when(testCaseService.getTestCasesForTestPlan(anyInt())).thenReturn(getTestCases());
        mvc.perform(get("/tlp-api/testplan/1/testcases")
                .header("TLP-Server-Url", TESTLINK_SERVER_URL)
                .header("TLP-Api-Key", API_KEY_GOOD)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(100))
                .andExpect(jsonPath("$[1].id").value(101));
    }

    @Test
    public void get_testcases_for_testplan_notfound() throws Exception {
        when(testCaseService.getTestCasesForTestPlan(anyInt())).thenReturn(null);
        mvc.perform(get("/tlp-api/testplan/1/testcases")
                .header("TLP-Server-Url", TESTLINK_SERVER_URL)
                .header("TLP-Api-Key", API_KEY_GOOD)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void gget_testcases_for_testplan_and_build() throws Exception {
        when(testCaseService.getTestCasesForTestPlanAndName(anyInt(), anyInt())).thenReturn(getTestCases());
        mvc.perform(get("/tlp-api/testplan/12/build/24/testcases")
                .header("TLP-Server-Url", TESTLINK_SERVER_URL)
                .header("TLP-Api-Key", API_KEY_GOOD)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(100))
                .andExpect(jsonPath("$[1].id").value(101));
    }

    @Test
    public void gget_testcases_for_testplan_and_build_notFound() throws Exception {
        when(testCaseService.getTestCasesForTestPlanAndName(anyInt(), anyInt())).thenReturn(null);
        mvc.perform(get("/tlp-api/testplan/12/build/24/testcases")
                .header("TLP-Server-Url", TESTLINK_SERVER_URL)
                .header("TLP-Api-Key", API_KEY_GOOD)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
