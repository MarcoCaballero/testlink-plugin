package com.marco.tlp.services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.marco.tlp.models.Plugin;
import com.marco.tlp.models.rpccontrollers.TestExecution;

import br.eti.kinoshita.testlinkjavaapi.model.Attachment;
import br.eti.kinoshita.testlinkjavaapi.model.ReportTCResultResponse;
import br.eti.kinoshita.testlinkjavaapi.model.TestCase;

@Service
public class TestCaseService {

	private static final Logger logger = LoggerFactory.getLogger(TestCaseService.class);
	private Plugin plugin;

	@Autowired
	public TestCaseService(Plugin plugin) {
		this.plugin = plugin;
	}

	public List<TestCase> getTestCasesForTestPlanAndName(Integer testPlanId, Integer buildId) {
		return plugin.getTestCasesForTestPlanAndBuild(testPlanId, buildId);
	}

	public List<TestCase> getTestCasesForTestPlan(Integer testPlanId) {
		return plugin.getTestCasesForTestPlan(testPlanId);
	}

	public List<TestCase> getTestCasesForTestSuite(Integer testSuiteId) {
		return plugin.getTestCasesForTestSuite(testSuiteId);
	}

	public TestCase getTestCaseByPlatform(Integer planId, Integer buildId, Integer testId, String platformName) {
		return plugin.getTestCaseByPlatform(planId, buildId, testId, platformName);
	}

	public TestCase getTestCase(Integer testCaseId) {
		return plugin.getTestCase(testCaseId);
	}

	public ReportTCResultResponse executeTest(TestExecution execution) {
		return plugin.executeTest(execution);
	}

	public Attachment uploadExecutionAttachment(Integer executionId, MultipartFile multiPartfile) {
		String fileContent = null;
		try {
			byte[] byteArray = FileUtils.readFileToByteArray(multipartToFile(multiPartfile));
			fileContent = new String(Base64.encodeBase64(byteArray));
		} catch (IOException e) {
			e.printStackTrace(System.err);
			System.exit(-1);
		}
		logger.info("New File received");
		return plugin.uploadExecutionAttachment(executionId, fileContent);
	}

	private File multipartToFile(MultipartFile multipart) throws IllegalStateException, IOException {
		File convFile = new File(multipart.getOriginalFilename());
		convFile.createNewFile();
		FileOutputStream fos = new FileOutputStream(convFile);
		fos.write(multipart.getBytes());
		fos.close();
		return convFile;
	}
}
