package com.marco.tlp.config;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.BAD_REQUEST, reason="No enriched headers provided")
public class MissingCustomHeaderException extends RuntimeException{

	private static final long serialVersionUID = 5L;
	
	public MissingCustomHeaderException(String msg) {
		super(msg);
	}

}
