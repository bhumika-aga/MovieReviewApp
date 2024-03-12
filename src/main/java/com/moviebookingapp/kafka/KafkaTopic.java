//package com.moviebookingapp.kafka;
//
//import java.util.HashMap;
//import java.util.Map;
//
//import org.apache.kafka.clients.admin.AdminClientConfig;
//import org.apache.kafka.clients.admin.NewTopic;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.kafka.core.KafkaAdmin;
//
//@Configuration
//public class KafkaTopic {
//
//	@Value(value = "${spring.kafka.bootstrap-servers}")
//	private String bootstrapAddress;
//
//    @Bean
//    KafkaAdmin kafkaAdmin() {
//		Map<String, Object> config = new HashMap<>();
//		config.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
//		return new KafkaAdmin(config);
//	}
//
//    @Bean
//    NewTopic topic1() {
//		return new NewTopic("moviebookingapp", 1, (short) 1);
//	}
//}