package com.marco.tlp.models;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

import br.eti.kinoshita.testlinkjavaapi.TestLinkAPI;
import br.eti.kinoshita.testlinkjavaapi.model.TestProject;
import br.eti.kinoshita.testlinkjavaapi.util.TestLinkAPIException;

@Component
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class RPCPlugin implements Plugin {

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	private TestLinkAPI api = null;


	public void setApi(String url, String devKey) {
		URL testlinkURL = null;
		try {
			testlinkURL = new URL(url);
		} catch (MalformedURLException mue) {
			logger.error("Wrong TestLink Server Url");
		}

		try {
			this.api = new TestLinkAPI(testlinkURL, devKey);
		} catch (TestLinkAPIException te) {
			logger.error("Wrong TestLink API KEY");
		}
	}

	@Override
	public List<TestProject> getProjects() {
		return Arrays.asList(api.getProjects());
	}

	@Override
	public List<TestProject> setProjects(String name, String prefix, String notes) {
		// TODO Auto-generated method stub
		return null;
	}

}
