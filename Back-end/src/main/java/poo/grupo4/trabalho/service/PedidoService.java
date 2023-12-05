package poo.grupo4.trabalho.service;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import poo.grupo4.trabalho.entity.Pedido;
import poo.grupo4.trabalho.repository.PedidoRepository;

@Service
public class PedidoService {

  @Autowired()
  PedidoRepository pedidoRepository;

  @Transactional
  public void criandoPedido(Pedido novoPedido) {
    pedidoRepository.save(novoPedido);
  }

  @Transactional
  public Optional<Pedido> pegandoDadosPedido(long id) {
    return pedidoRepository.findById(id);
  }

  @Transactional
  public Optional<Pedido> deletandoDadosPedido(long id) {
    try {
      if (pedidoRepository.existsById(id)) {
        Pedido apagarPedido = pedidoRepository.findById(id).get();
        pedidoRepository.deleteById(id);
        return Optional.of(apagarPedido);
      } else {
        return Optional.empty();
      }
    } catch (Exception e) {
      throw e;
    }
  }

  @Transactional
  public List<Pedido> pegandoTodosDadosPedido() {
    return pedidoRepository.findAll();
  }

  @Transactional
  public void atualizandoPedido(Pedido pedidoAtualizado, long id) {
    Pedido pedido = pedidoRepository.getReferenceById(id);
    pedido.setIdFuncionario(pedidoAtualizado.getIdFuncionario());
    pedido.setIdPreco(pedidoAtualizado.getIdPreco());
    pedido.setDataEmissao(pedidoAtualizado.getDataEmissao());
    pedido.setDataFinalizacao(pedidoAtualizado.getDataFinalizacao());
    pedidoRepository.save(pedido);
    return;
  }
}
