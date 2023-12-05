package poo.grupo4.trabalho.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import poo.grupo4.trabalho.entity.Gerente;
import poo.grupo4.trabalho.repository.GerenteRepository;

@Service
public class GerenteService {

  @Autowired()
  GerenteRepository gerenteRepository;

  @Transactional
  public void criandoGerente(Gerente novoGerente) {
    gerenteRepository.save(novoGerente);
  }

  @Transactional
  public Optional<Gerente> pegandoDadosGerente(Long id) {
    return gerenteRepository.findById(id);
  }

  @Transactional
  public void atualizandoGerente(Gerente gerenteAtualizado, Long id) {
    Gerente gerente = gerenteRepository.getReferenceById(id);
    gerente.setEmail(gerenteAtualizado.getEmail());
    gerente.setNome(gerenteAtualizado.getNome());
    gerente.setSetor(gerenteAtualizado.getSetor());
    gerente.setTelefone(gerenteAtualizado.getTelefone());
    gerenteRepository.save(gerente);
    return;
  }

  @Transactional
  public List<Gerente> pegandoTodosDadosGerente() {
    return gerenteRepository.findAll();
  }

  @Transactional
  public Optional<Gerente> deletandoDadosGerente(long id) {
    try {
      if (gerenteRepository.existsById(id)) {
        Gerente apagarGerente = gerenteRepository.findById(id).get();
        gerenteRepository.deleteById(id);
        return Optional.of(apagarGerente);
      } else {
        return Optional.empty();
      }
    } catch (Exception e) {
      throw e;
    }
  }

}
