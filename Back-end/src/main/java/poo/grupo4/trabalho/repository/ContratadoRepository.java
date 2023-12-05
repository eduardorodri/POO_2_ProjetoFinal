package poo.grupo4.trabalho.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import poo.grupo4.trabalho.entity.Contratado;

@Repository
public interface ContratadoRepository extends JpaRepository<Contratado, Long> {

}