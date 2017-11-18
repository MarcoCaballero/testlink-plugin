package com.marco.tlp.models.RPCControllers;

import java.util.Arrays;
import java.util.List;

import br.eti.kinoshita.testlinkjavaapi.TestLinkAPI;


public abstract class Controller<Type>{	
	protected TestLinkAPI api;
	
	protected Controller(TestLinkAPI api) {
		this.api = api;
	}
	
	protected List<Type> toList(Type[] t) {
		return Arrays.asList(t);
	}
}
