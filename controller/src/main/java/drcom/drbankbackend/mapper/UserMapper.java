package drcom.drbankbackend.mapper;

import drcom.drbankbackend.dto.UserDTO;
import drcom.drbankbackend.entity.User;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUserEntity(UserDTO src);
    UserDTO toUserDTO(User src);
}