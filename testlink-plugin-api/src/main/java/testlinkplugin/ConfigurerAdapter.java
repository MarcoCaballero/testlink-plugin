package testlinkplugin;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

public class ConfigurerAdapter extends WebMvcConfigurerAdapter {

	private final String MAPPING_PATH = "/**";
	private final String ALLOWED_ORIGINS = "*";
	private final String[] ALLOWED_METHODS = { "GET", "POST", "OPTIONS", "PUT", "DELETE" };
	private final String[] ALLOWED_HEADERS = { "Content-Type", "X-Requested-With", "accept", "Origin",
			"Access-Control-Request-Method", "Access-Control-Request-Headers" };
	private final String[] EXPOSED_HEADERS = { "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials" };
	private final boolean ALLOW_CREDENTIALS = true;
	private final long MAX_AGE = 3600;

	private CorsRegistry registry;

	public ConfigurerAdapter() {
		registry = new CorsRegistry();
		registry.addMapping(MAPPING_PATH)
				.allowedOrigins(ALLOWED_ORIGINS)
					.allowedMethods(ALLOWED_METHODS)
					.allowedHeaders(ALLOWED_HEADERS)
					.exposedHeaders(EXPOSED_HEADERS)
					.allowCredentials(ALLOW_CREDENTIALS)
					.maxAge(MAX_AGE);
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		super.addCorsMappings(this.registry);
	}

}
