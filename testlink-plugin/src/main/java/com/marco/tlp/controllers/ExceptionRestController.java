package com.marco.tlp.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.marco.tlp.config.MissingCustomHeaderException;

@RestController
public class ExceptionRestController {
	
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MissingCustomHeaderException.class)
	public String exception(MissingCustomHeaderException e) {
	    return "ERROR" + e.getMessage();
	}
}
