package poo.grupo4.trabalho.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import jakarta.transaction.Transactional;
import poo.grupo4.trabalho.entity.Contratado;

import poo.grupo4.trabalho.repository.ContratadoRepository;

@Service
public class ContratadoService {

  @Autowired()
  private ContratadoRepository contratadoRepository;

  public void criarFuncionarioContratado(Contratado novoContratado, Long idGerente) {
    novoContratado.setIdGerente(idGerente);
    contratadoRepository.save(novoContratado);
    return;
  }

  public void atualizarFuncionarioContratado(Contratado novoContratado, Long idGerente) {
    Contratado contratado = contratadoRepository.getReferenceById(idGerente);
    contratado.setFuncao(novoContratado.getFuncao());
    contratado.setNome(novoContratado.getNome());
    contratado.setTelefone(novoContratado.getTelefone());
    contratadoRepository.save(contratado);
  }

  public Optional<Contratado> pegarDadosFuncionarioContratado(Long id) {
    return contratadoRepository.findById(id);
  }

  public void deletarFuncionarioContratado(@PathVariable Long id) {
    contratadoRepository.deleteById(id);
  }

  @Transactional
  public List<Contratado> pegandoTodosDadosContratado() {
    return contratadoRepository.findAll();
  }

  @Transactional
  public Optional<Contratado> deletandoDadosContratado(long id) {
    try {
      if (contratadoRepository.existsById(id)) {
        Contratado apagarContratado = contratadoRepository.findById(id).get();
        contratadoRepository.deleteById(id);
        return Optional.of(apagarContratado);
      } else {
        return Optional.empty();
      }
    } catch (Exception e) {
      throw e;
    }
  }

}
