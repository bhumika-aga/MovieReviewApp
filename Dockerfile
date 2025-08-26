FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy Maven files first for better caching
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Download dependencies
RUN chmod +x ./mvnw && ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Run the application
EXPOSE 8000
CMD ["java", "-jar", "target/ReelCritic-1.0.0.jar"]