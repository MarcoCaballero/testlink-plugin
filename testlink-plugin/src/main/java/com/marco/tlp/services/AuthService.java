package com.marco.tlp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marco.tlp.models.Plugin;

@Service
public class AuthService {
	
	private Plugin plugin;

	@Autowired
	public AuthService(Plugin plugin) {
		this.plugin = plugin;
	}
	
	public boolean isAuthorized(String url, String key) {
		return plugin.isAuthKey(url, key);
	}
}
