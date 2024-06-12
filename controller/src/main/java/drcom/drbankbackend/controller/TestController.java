package drcom.drbankbackend.controller;

import drcom.drbankbackend.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import drcom.drbankbackend.entity.Test;

import java.util.Optional;

@RestController
@RequestMapping("/test")
public class TestController {
    @Autowired
    private TestRepository testRepository;
    @GetMapping
    public String test() {
        Optional<Test> test = testRepository.find("Success!");
        if (test.isEmpty()) return "No DB =(";
        return test.get().getText();
    }
}