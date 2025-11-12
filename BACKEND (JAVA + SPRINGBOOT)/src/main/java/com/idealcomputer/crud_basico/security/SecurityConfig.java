package com.idealcomputer.crud_basico.security;

import com.idealcomputer.crud_basico.enums.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable()) // ✅ Desabilita CSRF
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(authorize -> authorize
                        // ========================================
                        // ENDPOINTS PÚBLICOS (SEM AUTENTICAÇÃO)
                        // ========================================
                        .requestMatchers(HttpMethod.POST, "/api/auth/register").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()

                        // Endpoints de recomendações (público)
                        .requestMatchers(HttpMethod.POST, "/api/recommendations/generate").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/recommendations/**").permitAll()

                        // ========================================
                        // ✅ ENDPOINTS DE BUILDS (USUÁRIOS LOGADOS)
                        // ========================================
                        .requestMatchers(HttpMethod.GET, "/api/builds/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/builds/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/builds/**").authenticated()

                        // ========================================
                        // ENDPOINTS PROTEGIDOS - APENAS ADMIN
                        // ========================================
                        .requestMatchers("/api/usuarios/**").hasAuthority(UserRole.ADMINISTRADOR.name())
                        .requestMatchers("/api/cpus/**").hasAuthority(UserRole.ADMINISTRADOR.name())
                        .requestMatchers("/api/placas-mae/**").hasAuthority(UserRole.ADMINISTRADOR.name())
                        .requestMatchers("/api/gpus/**").hasAuthority(UserRole.ADMINISTRADOR.name())
                        .requestMatchers("/api/memorias-ram/**").hasAuthority(UserRole.ADMINISTRADOR.name())
                        .requestMatchers("/api/armazenamentos/**").hasAuthority(UserRole.ADMINISTRADOR.name())
                        .requestMatchers("/api/fontes/**").hasAuthority(UserRole.ADMINISTRADOR.name())
                        .requestMatchers("/api/gabinetes/**").hasAuthority(UserRole.ADMINISTRADOR.name())
                        .requestMatchers("/api/refrigeracoes/**").hasAuthority(UserRole.ADMINISTRADOR.name())

                        // ========================================
                        // OUTRAS ROTAS AUTENTICADAS
                        // ========================================
                        .anyRequest().authenticated()
                )

                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}