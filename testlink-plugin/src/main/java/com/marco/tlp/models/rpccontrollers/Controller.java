package com.marco.tlp.models.rpccontrollers;

import java.util.Arrays;
import java.util.List;

import br.eti.kinoshita.testlinkjavaapi.TestLinkAPI;


public abstract class Controller<T>{	
	protected TestLinkAPI api;
	
	protected Controller(TestLinkAPI api) {
		this.api = api;
	}
	
	protected List<T> toList(T[] t) {
		return Arrays.asList(t);
	}
}
