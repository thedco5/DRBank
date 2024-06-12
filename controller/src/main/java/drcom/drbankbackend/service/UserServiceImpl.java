package drcom.drbankbackend.service;

import drcom.drbankbackend.dto.LoginDTO;
import drcom.drbankbackend.dto.ResponseDTO;
import drcom.drbankbackend.entity.User;
import drcom.drbankbackend.exception.AppException;
import drcom.drbankbackend.exception.IncorrectCredentialException;
import drcom.drbankbackend.exception.UserAlreadyExists;
import drcom.drbankbackend.mapper.UserMapper;
import drcom.drbankbackend.repository.UserRepository;
import drcom.drbankbackend.dto.UserDTO;
import drcom.drbankbackend.vo.Currency;
import drcom.drbankbackend.vo.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.view.RedirectView;

import java.math.BigDecimal;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Value("${drbank.path.backend}")
    private String BACKEND_PATH;
    @Value("${drbank.path.frontend}")
    private String FRONTEND_PATH;

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, EmailService emailService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public ResponseEntity<Object> createUser(UserDTO userDTO) {

        doesUserAlreadyExist(userDTO);
        checkCredentials(userDTO);
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        setUserDefaults(userDTO);
        sendVerificationEmail(userDTO);

        User user = userMapper.toUserEntity(userDTO);
        System.out.println(userDTO);
        System.out.println(user);
        userRepository.save(user);

        return ResponseEntity.ok(new ResponseDTO("User created successfully"));

    }

    @Override
    public RedirectView verifyUser(String username, String code) {

        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty())
            return new RedirectView(FRONTEND_PATH);

        User user = userOptional.get();

        if (user.isVerified())
            return new RedirectView(FRONTEND_PATH);

        if (code.equals(user.getVerificationCode())) {
            userRepository.updateVerified(user.getId(), true);
            userRepository.removeVerificationCode(user.getId());
            return new RedirectView(FRONTEND_PATH + "/verified");
        }

        return new RedirectView(FRONTEND_PATH);

    }

    private void doesUserAlreadyExist(UserDTO userDTO) {
        Optional<User> userOptional;
        userOptional = userRepository.findByUsername(userDTO.getUsername());
        if (userOptional.isPresent())
            throw new UserAlreadyExists("username");
        userOptional = userRepository.findByEmail(userDTO.getEmail());
        if (userOptional.isPresent())
            throw new UserAlreadyExists("email");
    }

    private void checkCredentials(UserDTO userDTO) {
        if (!userDTO.getName().matches(".+"))
            throw new IncorrectCredentialException("name");
        if (!userDTO.getUsername().matches("^[a-zA-Z0-9_]+$"))
            throw new IncorrectCredentialException("username");
        if (!userDTO.getEmail().matches("^\\S+@\\S+$"))
            throw new IncorrectCredentialException("email");
        if (!(userDTO.getPassword().length() >= 8))
            throw new IncorrectCredentialException("password");
    }

    private void setUserDefaults(UserDTO userDTO) {
        userDTO.setVerified(false);
        userDTO.setRole(Role.USER);
        Map<Currency, BigDecimal> balance = new HashMap<>(1);
        balance.put(Currency.BGN, BigDecimal.valueOf(0));
        balance.put(Currency.EUR, BigDecimal.valueOf(0));
        userDTO.setBalance(balance);
        userDTO.setReceivedRequests(new ArrayList<>());
        userDTO.setReceivedTransfers(new ArrayList<>());
    }

    private void sendVerificationEmail(UserDTO userDTO) {
        userDTO.setVerificationCode(RandomCodeGenerator.generateRandomCode(6));
        emailService.sendEmail(
                userDTO.getEmail(),
                "DRBank верификация | DRBank verification",
                "Добре дошли, " + userDTO.getName() + ", "
                        + "в потребителската система за разплащания DRBank!\n"
                        + "Welcome, " + userDTO.getName() + ", "
                        + "to the user system for payments DRBank!\n\n"
                        + "Първа стъпка след регистрацията Ви (като @"
                        + userDTO.getUsername()
                        + ") е да потвърдите имейла си.\n"
                        + "First step after registration (as @"
                        + userDTO.getUsername()
                        + ") is to verify your email.\n\n"
                        + "Моля натиснете линка отдолу, за да изпълните потвърждаването на имейла Ви:\n"
                        + "Please follow the link below to finish the verification of your email:\n\n\n"
                        + BACKEND_PATH
                        + "/user/verify/" + userDTO.getUsername()
                        + "/" + userDTO.getVerificationCode()
        );
    }

    @Override
    public UserDTO findByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return userMapper.toUserDTO(user);
    }

    @Override
    public UserDTO login(LoginDTO loginDTO) {
        User user = userRepository.findByUsername(loginDTO.getUsername())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        if (passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            return userMapper.toUserDTO(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

}