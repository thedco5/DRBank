package drcom.drbankbackend.repository;

import drcom.drbankbackend.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    @Query("{ 'username' : ?0 }")
    Optional<User> findByUsername(String username);

    @Query("{ 'email' : ?0 }")
    Optional<User> findByEmail(String email);

    @Query("{ _id : ObjectId('?0') }")
    @Update("{ $set : { 'verified' : ?1 } }")
    void updateVerified(String id, boolean validated);

    @Query("{ _id : ObjectId('?0') }")
    @Update("{ $unset : { 'verificationCode' : '' } } ")
    void removeVerificationCode(String id);

}