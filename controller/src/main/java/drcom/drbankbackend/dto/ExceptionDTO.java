package drcom.drbankbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class ExceptionDTO {
    private LocalDateTime timestamp;
    private String message;
}