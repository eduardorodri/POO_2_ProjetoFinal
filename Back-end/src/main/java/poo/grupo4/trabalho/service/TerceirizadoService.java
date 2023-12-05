package poo.grupo4.trabalho.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import jakarta.transaction.Transactional;
import poo.grupo4.trabalho.entity.Terceirizado;
import poo.grupo4.trabalho.repository.TerceirizadoRepository;

@Service
public class TerceirizadoService {

  @Autowired()
  TerceirizadoRepository terceirizadoRepository;

  public void criarFuncionarioTerceirizado(Terceirizado novoTerceirizado, Long idGerente) {
    novoTerceirizado.setIdGerente(idGerente);
    System.out.println(idGerente);
    terceirizadoRepository.save(novoTerceirizado);
    return;
  }

  public void atualizarFuncionarioTerceirizado(Terceirizado novoTerceirizado, Long idGerente) {
    Terceirizado terceirizado = terceirizadoRepository.getReferenceById(idGerente);
    terceirizado.setFuncao(novoTerceirizado.getFuncao());
    terceirizado.setNome(novoTerceirizado.getNome());
    terceirizado.setTelefone(novoTerceirizado.getTelefone());
    terceirizadoRepository.save(terceirizado);
  }

  public Optional<Terceirizado> pegarDadosFuncionarioTerceirizado(Long id) {
    return terceirizadoRepository.findById(id);
  }

  public void deletarFuncionarioTerceirizado(@PathVariable Long id) {
    terceirizadoRepository.deleteById(id);
  }

  @Transactional
  public List<Terceirizado> pegandoTodosDadosTerceirizado() {
    return terceirizadoRepository.findAll();
  }
}
