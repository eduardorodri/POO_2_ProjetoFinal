package poo.grupo4.trabalho.service;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import poo.grupo4.trabalho.entity.Preco;
import poo.grupo4.trabalho.repository.PrecoRepository;

@Service
public class PrecoService {

  @Autowired()
  PrecoRepository precoRepository;

  @Transactional
  public void criandoPreco(Preco novoPreco) {
    precoRepository.save(novoPreco);
  }

  @Transactional
  public Optional<Preco> pegandoDadosPreco(long id) {
    return precoRepository.findById(id);
  }

  @Transactional
  public Optional<Preco> deletandoDadosPreco(long id) {
    try {
      if (precoRepository.existsById(id)) {
        Preco apagarPreco = precoRepository.findById(id).get();
        precoRepository.deleteById(id);
        return Optional.of(apagarPreco);
      } else {
        return Optional.empty();
      }
    } catch (Exception e) {
      throw e;
    }
  }

  @Transactional
  public List<Preco> pegandoTodosDadosPreco() {
    return precoRepository.findAll();
  }

  @Transactional
  public void atualizandoPreco(Preco precoAtualizado, long id) {
    Preco preco = precoRepository.getReferenceById(id);
    preco.setPreco(precoAtualizado.getPreco());
    preco.setTipoServico(precoAtualizado.getTipoServico());
    preco.setIdGerente(precoAtualizado.getIdGerente());
    precoRepository.save(preco);
    return;
  }
}
