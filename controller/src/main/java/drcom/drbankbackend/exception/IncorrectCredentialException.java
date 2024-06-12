package drcom.drbankbackend.exception;

public class IncorrectCredentialException extends RuntimeException {
    public IncorrectCredentialException(String message) {
        super(message);
    }
}