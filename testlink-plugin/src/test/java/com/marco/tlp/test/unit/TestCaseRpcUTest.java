package com.marco.tlp.test.unit;

import static org.mockito.Matchers.anyInt;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.marco.tlp.models.rpccontrollers.TestCaseController;

import org.junit.Test;
import org.junit.Assert;
import org.mockito.Mockito;

import br.eti.kinoshita.testlinkjavaapi.TestLinkAPI;
import br.eti.kinoshita.testlinkjavaapi.constants.ExecutionType;
import br.eti.kinoshita.testlinkjavaapi.constants.TestCaseDetails;
import br.eti.kinoshita.testlinkjavaapi.model.Platform;
import br.eti.kinoshita.testlinkjavaapi.model.TestCase;
import br.eti.kinoshita.testlinkjavaapi.model.TestCaseStep;

public class TestCaseRpcUTest {

    TestLinkAPI mockApi = Mockito.mock(TestLinkAPI.class);
    TestCaseController sut = new TestCaseController(mockApi);

    @Test
    public void get_testcase_by_platform() throws Exception {
        Mockito.when(mockApi.getTestCasesForTestPlan(new Integer(2), null, new Integer(4), null, null, null, null, null, null, true,
                TestCaseDetails.FULL)).thenReturn(getTestCases());

        Assert.assertEquals("name1", sut.getTestCaseByPlatform(2, 4, 100, "platform").getName());
    }

    @Test
    public void get_testcase_for_testplan_and_build() throws Exception {
        Mockito.when(mockApi.getTestCasesForTestPlan(new Integer(2), null, new Integer(4), null, null, null, null, null, null, true,
                TestCaseDetails.FULL)).thenReturn(getTestCases());

        Assert.assertEquals(Arrays.asList(getTestCases()).get(0).getName(), sut.getTestCasesForTestPlanandBuild(2, 4).get(0).getName());
    }

    private TestCase[] getTestCases() {
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
        Platform platform = new Platform(1, "platform", "notes");

        TestCase t1 = new TestCase(100, "name1", null, 2, null, "summary1", steps, "preconditions1", null, null,
                ExecutionType.AUTOMATED, null, null, null, null, null, null, null, 1, null, null, null, platform, null);
        TestCase t2 = new TestCase(101, "name2", null, 2, null, "summary2", steps, "preconditions2", null, null,
                ExecutionType.AUTOMATED, null, null, null, null, null, null, null, 1, null, null, null, platform, null);

        return new TestCase[] { t1, t2 };
    }
}
