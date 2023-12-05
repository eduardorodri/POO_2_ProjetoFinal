package poo.grupo4.trabalho.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import poo.grupo4.trabalho.entity.Preco;

@Repository
public interface PrecoRepository extends JpaRepository<Preco, Long> {

}
