package com.example.demo.Safety;

import com.example.demo.Documents.dto.LoginDTO;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.ZonedDateTime;
import java.util.concurrent.TimeUnit;

public class WebClientHandler {
    @Autowired
    private JWTTokenProvider tokenProvider;

    //Configuring WebClient Instance with HTTP Client
    HttpClient httpClient = HttpClient.create()
            .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 1000)
            .responseTimeout(Duration.ofMillis(1000))
            .doOnConnected(conn -> conn.addHandlerLast(new ReadTimeoutHandler(5000, TimeUnit.MILLISECONDS))
                    .addHandlerLast(new WriteTimeoutHandler(1000, TimeUnit.MILLISECONDS)));

    //Creating a WebClient
    WebClient client = WebClient.builder()
            .clientConnector(new ReactorClientHttpConnector(httpClient))
            .baseUrl(Constants.EMPLOYEES)
            .build(); //Had to Import spring-boot-starter-webflux dependency

    public WebClient.ResponseSpec webBuilderLogin(LoginDTO dto, String endPoint){
        //Defining the HTTP Method
        WebClient.UriSpec<WebClient.RequestBodySpec> uriSpec = client.method(HttpMethod.GET);

        //Specifying URL
        WebClient.RequestBodySpec uri = uriSpec.uri(endPoint);

        //Filling body
        WebClient.RequestHeadersSpec<?> bodySpec = uri.body(
                BodyInserters.fromValue(dto)
        );

        //Filling Header
        WebClient.ResponseSpec responseSpec = bodySpec.header(
                        HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML)
                .acceptCharset(StandardCharsets.UTF_8)
                .ifNoneMatch("*")
                .ifModifiedSince(ZonedDateTime.now())
                .retrieve();

        return responseSpec;

    }

    public String validator(String Authorization) {

        String responseBody = client.method(HttpMethod.GET)
                .uri("/verify")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header("Authorization", Authorization)
                .retrieve()
                .onStatus(status -> status.isError(), clientResponse -> {
                    return clientResponse.bodyToMono(String.class)
                            .flatMap(errorBody -> Mono.error(new RuntimeException("Token Inválido. Detalhe: " + errorBody)));
                })
                .bodyToMono(String.class)
                .block();

        return responseBody;
    }

}
