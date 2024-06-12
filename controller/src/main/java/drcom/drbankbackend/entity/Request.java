package drcom.drbankbackend.entity;

import drcom.drbankbackend.vo.Currency;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;

@Data
public class Request {

    @Id
    private String id;

    @Field
    private BigDecimal sum;
    @Field private Currency currency;
    @Field private String message;
    @Field private String receiverUsername;
    @Field private String senderId;

}