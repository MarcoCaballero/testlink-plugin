package com.marco.tlp.test.unit;

import static org.junit.Assert.fail;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.marco.tlp.config.HttpEnrichmentFilter;
import com.marco.tlp.models.MissingCustomHeaderException;
import com.marco.tlp.models.RPCPlugin;

import org.junit.Test;
import org.mockito.Mockito;

public class EnrichmentFilterUTest {
    private static final String TESTLINK_SERVER_URL = "http://172.18.0.1:80/lib/api/xmlrpc/v1/xmlrpc.php";
    private static final String SERVER_HEADER = "TLP-Server-Url";
    private static final String KEY_HEADER = "TLP-Api-Key";
    private String API_KEY_GOOD = "0c4eae230736ccd923409b3e144165a1";

    RPCPlugin plugin = Mockito.mock(RPCPlugin.class);
    HttpEnrichmentFilter filter = new HttpEnrichmentFilter(plugin);
    HttpServletRequest mockReq = Mockito.mock(HttpServletRequest.class);
    HttpServletResponse mockResp = Mockito.mock(HttpServletResponse.class);
    FilterChain mockFilterChain = Mockito.mock(FilterChain.class);
    FilterConfig mockFilterConfig = Mockito.mock(FilterConfig.class);

    @Test
    public void testDoFilterSuccess() throws Exception {
        Mockito.when(mockReq.getScheme()).thenReturn("http");
        Mockito.when(mockReq.getRemoteHost()).thenReturn("testing/localhost");
        Mockito.when(mockReq.getMethod()).thenReturn("GET");
        Mockito.when(mockReq.getRequestURI()).thenReturn("/tlp-api/testprojects");
        Mockito.when(mockReq.getHeader(SERVER_HEADER)).thenReturn(TESTLINK_SERVER_URL);
        Mockito.when(mockReq.getHeader(KEY_HEADER)).thenReturn(API_KEY_GOOD);
        Mockito.doNothing().when(plugin).connectToApi(SERVER_HEADER, KEY_HEADER);

        filter.init(mockFilterConfig);

        try {
            filter.doFilter(mockReq, mockResp, mockFilterChain);
        } catch (MissingCustomHeaderException expected) {
            fail("MissingCustomHeaderException not expected");
        }

        filter.destroy();
    }

    @Test(expected = MissingCustomHeaderException.class)
    public void testDoFilterFailure_no_server() throws Exception {
        Mockito.when(mockReq.getScheme()).thenReturn("http");
        Mockito.when(mockReq.getRemoteHost()).thenReturn("testing/localhost");
        Mockito.when(mockReq.getMethod()).thenReturn("GET");
        Mockito.when(mockReq.getRequestURI()).thenReturn("/tlp-api/testprojects");
        Mockito.when(mockReq.getHeader(SERVER_HEADER)).thenReturn(null);
        Mockito.when(mockReq.getHeader(KEY_HEADER)).thenReturn(API_KEY_GOOD);

        filter.init(mockFilterConfig);
        filter.doFilter(mockReq, mockResp, mockFilterChain);
        filter.destroy();
    }

    @Test(expected = MissingCustomHeaderException.class)
    public void testDoFilterFailure_no_key() throws Exception {
        Mockito.when(mockReq.getScheme()).thenReturn("http");
        Mockito.when(mockReq.getRemoteHost()).thenReturn("testing/localhost");
        Mockito.when(mockReq.getMethod()).thenReturn("GET");
        Mockito.when(mockReq.getRequestURI()).thenReturn("/tlp-api/testprojects");
        Mockito.when(mockReq.getHeader(SERVER_HEADER)).thenReturn(TESTLINK_SERVER_URL);
        Mockito.when(mockReq.getHeader(KEY_HEADER)).thenReturn(null);

        filter.init(mockFilterConfig);
        filter.doFilter(mockReq, mockResp, mockFilterChain);
        filter.destroy();
    }

    @Test
    public void test_no_apply_filter_cors() throws Exception {
        Mockito.when(mockReq.getScheme()).thenReturn("http");
        Mockito.when(mockReq.getRemoteHost()).thenReturn("testing/localhost");
        Mockito.when(mockReq.getMethod()).thenReturn("OPTIONS");
        Mockito.when(mockReq.getRequestURI()).thenReturn("/tlp-api/testprojects");
        Mockito.when(mockReq.getHeader(SERVER_HEADER)).thenReturn(TESTLINK_SERVER_URL);
        Mockito.when(mockReq.getHeader(KEY_HEADER)).thenReturn(API_KEY_GOOD);

        filter.init(mockFilterConfig);
        filter.doFilter(mockReq, mockResp, mockFilterChain);

        verify(plugin, never()).connectToApi(TESTLINK_SERVER_URL, API_KEY_GOOD);

        filter.destroy();
    }

    @Test
    public void test_no_apply_filter_swagger_docs() throws Exception {
        Mockito.when(mockReq.getScheme()).thenReturn("http");
        Mockito.when(mockReq.getRemoteHost()).thenReturn("testing/localhost");
        Mockito.when(mockReq.getMethod()).thenReturn("GET");
        Mockito.when(mockReq.getRequestURI()).thenReturn("/swagger-ui.html");

        filter.init(mockFilterConfig);
        filter.doFilter(mockReq, mockResp, mockFilterChain);

        verify(plugin, never()).connectToApi(TESTLINK_SERVER_URL, API_KEY_GOOD);

        filter.destroy();
    }

    @Test
    public void test_no_apply_filter_swagger_deps() throws Exception {
        Mockito.when(mockReq.getScheme()).thenReturn("http");
        Mockito.when(mockReq.getRemoteHost()).thenReturn("testing/localhost");
        Mockito.when(mockReq.getMethod()).thenReturn("GET");
        Mockito.when(mockReq.getRequestURI()).thenReturn("springfox-swagger-ui");

        filter.init(mockFilterConfig);
        filter.doFilter(mockReq, mockResp, mockFilterChain);

        verify(plugin, never()).connectToApi(TESTLINK_SERVER_URL, API_KEY_GOOD);

        filter.destroy();
    }
}
