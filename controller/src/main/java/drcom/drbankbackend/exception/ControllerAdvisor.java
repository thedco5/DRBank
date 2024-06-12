package drcom.drbankbackend.exception;

import drcom.drbankbackend.dto.ExceptionDTO;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class ControllerAdvisor extends ResponseEntityExceptionHandler {

    @ExceptionHandler(AppException.class)
    @ResponseBody
    public ResponseEntity<ExceptionDTO> handleAppException(AppException e) {
        return ResponseEntity.status(e.getCode())
                .body(ExceptionDTO.builder().message(e.getMessage()).build());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleCityNotFoundException(
            UserNotFoundException ex, WebRequest request) {
        return new ResponseEntity<>(
                new ExceptionDTO(
                        LocalDateTime.now(),
                        ex.getMessage()),
                        HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserAlreadyExists.class)
    public ResponseEntity<Object> handleNodataFoundException(
            UserAlreadyExists ex, WebRequest request) {
        return new ResponseEntity<>(
                new ExceptionDTO(
                        LocalDateTime.now(),
                        ex.getMessage()),
                        HttpStatus.CONFLICT);
    }

    @ExceptionHandler(IncorrectCredentialException.class)
    public ResponseEntity<Object> handleIncorrectDataException(
            IncorrectCredentialException ex, WebRequest request) {
        return new ResponseEntity<>(
                new ExceptionDTO(
                        LocalDateTime.now(),
                        "Incorrect format for " + ex.getMessage()),
                HttpStatus.BAD_REQUEST);
    }

    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers,
            HttpStatus status, WebRequest request) {

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDate.now());
        body.put("status", status.value());

        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .toList();

        body.put("errors", errors);

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

}