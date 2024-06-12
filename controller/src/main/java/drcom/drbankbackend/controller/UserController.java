package drcom.drbankbackend.controller;

import drcom.drbankbackend.config.UserAuthProvider;
import drcom.drbankbackend.dto.LoginDTO;
import drcom.drbankbackend.dto.ResponseDTO;
import drcom.drbankbackend.service.UserService;
import drcom.drbankbackend.dto.UserDTO;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final UserAuthProvider userAuthProvider;

    @Autowired
    public UserController(UserService userService, UserAuthProvider userAuthProvider) {
        this.userService = userService;
        this.userAuthProvider = userAuthProvider;
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createUser(@RequestBody @Validated UserDTO userDTO) {
        userService.createUser(userDTO);
        userDTO.setToken(userAuthProvider.createToken(userDTO.getUsername()));
        return userService.createUser(userDTO);
    }

    @RequestMapping("/verify/{username}/{code}")
    public RedirectView verifyUser(@PathVariable String username, @PathVariable String code) {
        return userService.verifyUser(username, code);
    }

    @PostMapping("/auth")
    public ResponseEntity<Object> authUser(@RequestBody @Validated LoginDTO loginDTO) {
        UserDTO user = userService.login(loginDTO);
        user.setToken(userAuthProvider.createToken(user.getUsername()));
        return ResponseEntity.ok(user);
    }

}