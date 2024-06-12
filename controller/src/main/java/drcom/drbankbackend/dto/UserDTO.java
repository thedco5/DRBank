package drcom.drbankbackend.dto;

import drcom.drbankbackend.entity.Request;
import drcom.drbankbackend.entity.Transfer;
import drcom.drbankbackend.vo.Currency;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import drcom.drbankbackend.vo.Role;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private String id;

    @NotNull
    private String name;
    @NotNull
    private String username;
    @NotNull
    private String email;
    @NotNull
    private String password;

    private String token;

    private boolean verified;
    private String verificationCode;
    private Role role;
    private Map<Currency, BigDecimal> balance;
    @Field
    private List<Request> receivedRequests;
    @Field private List<Transfer> receivedTransfers;

}