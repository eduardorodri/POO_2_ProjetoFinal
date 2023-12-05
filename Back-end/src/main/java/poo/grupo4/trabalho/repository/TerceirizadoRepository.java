package poo.grupo4.trabalho.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import poo.grupo4.trabalho.entity.Terceirizado;

@Repository
public interface TerceirizadoRepository extends JpaRepository<Terceirizado, Long> {

}
