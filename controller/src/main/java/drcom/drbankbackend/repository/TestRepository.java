package drcom.drbankbackend.repository;

import drcom.drbankbackend.entity.Test;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TestRepository extends MongoRepository<Test, String> {
    @Query("{ 'text' : ?0 }")
    Optional<Test> find(String text);
}