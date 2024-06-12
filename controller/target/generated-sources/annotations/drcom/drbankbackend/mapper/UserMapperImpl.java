package drcom.drbankbackend.mapper;

import drcom.drbankbackend.dto.UserDTO;
import drcom.drbankbackend.entity.Request;
import drcom.drbankbackend.entity.Transfer;
import drcom.drbankbackend.entity.User;
import drcom.drbankbackend.vo.Currency;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-22T04:47:17+0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.2 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toUserEntity(UserDTO src) {
        if ( src == null ) {
            return null;
        }

        User user = new User();

        user.setId( src.getId() );
        user.setName( src.getName() );
        user.setUsername( src.getUsername() );
        user.setEmail( src.getEmail() );
        user.setPassword( src.getPassword() );
        user.setVerified( src.isVerified() );
        user.setVerificationCode( src.getVerificationCode() );
        user.setRole( src.getRole() );
        Map<Currency, BigDecimal> map = src.getBalance();
        if ( map != null ) {
            user.setBalance( new LinkedHashMap<Currency, BigDecimal>( map ) );
        }
        List<Request> list = src.getReceivedRequests();
        if ( list != null ) {
            user.setReceivedRequests( new ArrayList<Request>( list ) );
        }
        List<Transfer> list1 = src.getReceivedTransfers();
        if ( list1 != null ) {
            user.setReceivedTransfers( new ArrayList<Transfer>( list1 ) );
        }

        return user;
    }

    @Override
    public UserDTO toUserDTO(User src) {
        if ( src == null ) {
            return null;
        }

        UserDTO userDTO = new UserDTO();

        userDTO.setId( src.getId() );
        userDTO.setName( src.getName() );
        userDTO.setUsername( src.getUsername() );
        userDTO.setEmail( src.getEmail() );
        userDTO.setPassword( src.getPassword() );
        userDTO.setVerified( src.isVerified() );
        userDTO.setVerificationCode( src.getVerificationCode() );
        userDTO.setRole( src.getRole() );
        Map<Currency, BigDecimal> map = src.getBalance();
        if ( map != null ) {
            userDTO.setBalance( new LinkedHashMap<Currency, BigDecimal>( map ) );
        }
        List<Request> list = src.getReceivedRequests();
        if ( list != null ) {
            userDTO.setReceivedRequests( new ArrayList<Request>( list ) );
        }
        List<Transfer> list1 = src.getReceivedTransfers();
        if ( list1 != null ) {
            userDTO.setReceivedTransfers( new ArrayList<Transfer>( list1 ) );
        }

        return userDTO;
    }
}
