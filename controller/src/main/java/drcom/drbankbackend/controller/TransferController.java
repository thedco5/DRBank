package drcom.drbankbackend.controller;

import drcom.drbankbackend.dto.ResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transfer")
public class TransferController {

    @PostMapping("/create")
    public ResponseEntity<Object> createTransfer() {
        return ResponseEntity.ok(new ResponseDTO("Transfered."));
    }

}