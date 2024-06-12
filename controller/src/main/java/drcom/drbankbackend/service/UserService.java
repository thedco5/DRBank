package drcom.drbankbackend.service;

import drcom.drbankbackend.dto.LoginDTO;
import drcom.drbankbackend.dto.UserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.view.RedirectView;

public interface UserService {
    ResponseEntity<Object> createUser(UserDTO userDTO);
    RedirectView verifyUser(String username, String code);
    UserDTO findByUsername(String username);
    UserDTO login(LoginDTO loginDTO);
}