# Backend (Spring Boot)

**Project:** Backend service for the repository (Java Spring Boot).

**Location:** `./` (this README sits at the repository root next to the `pom.xml`).

**Overview:**
- **Purpose:** REST API backend implemented with Spring Boot. Provides authentication (JWT), user management, request lifecycle, and related services.
- **Language / Framework:** Java, Spring Boot, Maven (Maven Wrapper available).

**Repository Structure (important paths):**
- `pom.xml` : Maven build for the project.
- `src/main/java` : Java source code (packages under `com.digitini`).
- `src/main/resources` : Application configuration files (`application.properties`, `application.yml`).
- `src/test/java` : Unit/integration tests.
- `target/` : Build output (artifacts).

Prerequisites
- Java 11 or newer installed and `JAVA_HOME` set.
- Git (optional) to clone the repository.
- Maven Wrapper is included so you do not need a system Maven installation.

Build and run (Windows PowerShell)

1) Build the project (creates jar in `target/`):

```powershell
.\mvnw.cmd clean package -DskipTests=false
```

2) Run with Maven (development):

```powershell
.\mvnw.cmd spring-boot:run
```

3) Run the packaged jar:

```powershell
java -jar target\*.jar
```

Run tests

```powershell
.\mvnw.cmd test
```

Configuration
- Primary config files are `src/main/resources/application.properties` and `src/main/resources/application.yml`.
- Typical settings to check before running: database connection, JWT secret and expiration, server port.

Development notes
- There are security and JWT related classes in `src/main/java/com/digitini/config` and `src/main/java/com/digitini/user` (for example `SecurityConfig`, `JwtTokenProvider`, `JwtAuthFilter`). Check them when debugging auth issues.
- The project contains generated sources (mapper implementations) under `target/generated-sources/annotations` — these are produced during build.

Common commands (POSIX / PowerShell)
- POSIX: `./mvnw clean package`
- PowerShell (Windows): `.\mvnw.cmd clean package`

Contributing
- Fork / branch / PR workflow.
- Keep changes focused; add tests for new behavior.

Contact / Maintainers
- See repository owner and commit history for maintainers.

License
- Add a LICENSE file or include license text here if you want to specify one.

--
This README is a minimal introduction. If you want a more detailed API reference (endpoints, request/response examples), Docker setup, or CI instructions, tell me which sections to expand and I'll add them.
