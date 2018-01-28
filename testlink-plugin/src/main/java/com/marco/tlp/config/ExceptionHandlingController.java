package com.marco.tlp.config;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import br.eti.kinoshita.testlinkjavaapi.util.TestLinkAPIException;

@ControllerAdvice
@RestController
public class ExceptionHandlingController {
	
	@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Elastest TestLink-Plugin: Bad request to TestLink, the resource does not exist") // 409
	@ExceptionHandler(TestLinkAPIException.class)
	public Throwable conflict(TestLinkAPIException ex) {
		return ex.getCause();
	}
	
	@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Elastest TestLink-Plugin: No headers provided") // 409
	@ExceptionHandler(MissingCustomHeaderException.class)
	public Throwable conflict(MissingCustomHeaderException ex) {
		return ex.getCause();
	}
	
	
	@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Elastest TestLink-Plugin: Bad content type, expected JSON") // 409
	@ExceptionHandler(JsonParseException.class)
	public Throwable conflict(JsonParseException ex) {
		return ex.getCause();
	}
	
	@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Elastest TestLink-Plugin: Bad content type, expected JSON") // 409
	@ExceptionHandler(JsonMappingException.class)
	public Throwable conflict(JsonMappingException ex) {
		return ex.getCause();
	}
	
	@ExceptionHandler(value = IOException.class)  
	public String handleException(IOException ex){return ex.getMessage();} 
	
	@ExceptionHandler(value = Exception.class)  
    public String handleException(Exception ex){return ex.getMessage();} 
}
