package poo.grupo4.trabalho.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import poo.grupo4.trabalho.entity.Terceirizado;
import poo.grupo4.trabalho.service.TerceirizadoService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")

public class TerceirizadoController {

  @Autowired()
  TerceirizadoService terceirizadoService;

  @PostMapping("/terceirizado/{id}")
  public void criarFuncionarioTerceirizado(@RequestBody Terceirizado novoTerceirizado, @PathVariable Long id) {
    terceirizadoService.criarFuncionarioTerceirizado(novoTerceirizado, id);
    return;
  }

  @PutMapping("/terceirizado/{id}")
  public void atualizarFuncionarioTerceirizado(@RequestBody Terceirizado novoTerceirizado, @PathVariable Long id) {
    terceirizadoService.atualizarFuncionarioTerceirizado(novoTerceirizado, id);
  }

  @GetMapping("/terceirizado/{id}")
  public Optional<Terceirizado> pegarDadosFuncionarioTerceirizado(@PathVariable Long id) {
    return terceirizadoService.pegarDadosFuncionarioTerceirizado(id);
  }

  @DeleteMapping("/terceirizado/{id}")
  public void deletarFuncionarioTerceirizado(@PathVariable Long id) {
    terceirizadoService.deletarFuncionarioTerceirizado(id);
  }

  @GetMapping("/terceirizado")
  public List<Terceirizado> terceirizadoService() {
    return terceirizadoService.pegandoTodosDadosTerceirizado();
  }
}
