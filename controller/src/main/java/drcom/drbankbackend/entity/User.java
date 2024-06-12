package drcom.drbankbackend.entity;

import drcom.drbankbackend.vo.Currency;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import drcom.drbankbackend.vo.Role;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;

    @Field private String name;
    @Field private String username;
    @Field private String email;
    @Field private String password;

    @Field private boolean verified;
    @Field private String verificationCode;
    @Field private Role role;
    @Field private Map<Currency, BigDecimal> balance;
    @Field private List<Request> receivedRequests;
    @Field private List<Transfer> receivedTransfers;

}