package com.marco.tlp.models.rpccontrollers;

import java.net.MalformedURLException;
import java.net.URL;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import br.eti.kinoshita.testlinkjavaapi.TestLinkAPI;
import br.eti.kinoshita.testlinkjavaapi.util.TestLinkAPIException;

public class AuthController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	private String url;
	
	public AuthController(String url) {
		this.url = url;
	}
	
	public boolean isAuthKey(String key) {
		URL testlinkURL = null;
		try {
			testlinkURL = new URL(url);
		} catch (MalformedURLException mue) {
			logger.error("Wrong TestLink Server Url");
			return false;
		}

		try {
			new TestLinkAPI(testlinkURL, key);
		} catch (TestLinkAPIException te) {
			logger.error("Wrong TestLink API KEY");
			return false;
		}
		return true;
	}
}
