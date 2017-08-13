import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import CheckCircleIcon from 'material-ui-icons/CheckCircle';
import AddBoxIcon from 'material-ui-icons/AddBox';
import SettingsIcon from 'material-ui-icons/Settings';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';

import {
  changeBoard,
  previousBoard,
  addSymbol,
  deleteSymbols
} from './actions';
import speech from '../../speech';
import messages from './messages';
import SymbolDetails from './SymbolDetails';
import Settings from '../Settings';
import Grid from '../Grid';
import Output from './Output';
import Toolbar from './Toolbar';
import mulberrySymbols from '../../api/mulberry-symbols.json';

import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);

    const symbolsPerPage = 250;
    const from = 0;
    const to = from + symbolsPerPage;
    this.state = {
      output: [],
      selectedSymbols: [],
      isSelecting: false,
      isEditing: false,
      symbolDetailsOpen: false,
      settingsOpen: false,
      symbolsPerPage,
      sliceFrom: from,
      sliceTo: to
    };
  }

  symbolsRef = {};
  allSymbols = [];

  componentWillMount() {
    this.allSymbols = this.convertMulberryToSymbols(mulberrySymbols);
  }

  speak = text => {
    speech.speak(text);
  };

  cancelSpeak = () => {
    speech.cancel();
  };

  outputPush(value) {
    this.setState({ output: [...this.state.output, value] });
  }

  outputPop() {
    const [...output] = this.state.output;
    output.pop();
    this.setState({ output });
  }

  toggleSelectMode() {
    this.setState(prevState => ({
      isSelecting: !prevState.isSelecting,
      selectedSymbols: []
    }));
  }

  selectSymbol(symbolId) {
    this.setState({
      selectedSymbols: [...this.state.selectedSymbols, symbolId]
    });
  }

  deselectSymbol(symbolId) {
    const [...selectedSymbols] = this.state.selectedSymbols;
    const symbolIndex = selectedSymbols.indexOf(symbolId);
    selectedSymbols.splice(symbolIndex, 1);
    this.setState({ selectedSymbols });
  }

  toggleSymbolSelect(symbol) {
    const symbolId = symbol.id;

    if (symbol.isSelected) {
      this.deselectSymbol(symbolId);
    } else {
      this.selectSymbol(symbolId);
    }
  }

  handleSymbolClick = symbol => {
    const { changeBoard } = this.props;

    if (this.state.isSelecting) {
      this.toggleSymbolSelect(symbol);
      return;
    }

    switch (symbol.type) {
      case 'folder':
        changeBoard(symbol.boardId);
        break;
      default:
        this.outputPush(symbol);
        this.speak(this.symbolsRef[symbol.id].textContent);
    }
  };

  handleOutputClick = symbol => {
    const { intl } = this.props;
    const translatedOutput = this.state.output.reduce(
      (output, value) => output + intl.formatMessage({ id: value.label }) + ' ',
      ''
    );

    this.cancelSpeak();
    this.speak(translatedOutput);
  };

  handleOutputClearClick = () => {
    this.setState({ output: [] });
    this.cancelSpeak();
  };

  handleOutputBackspaceClick = () => {
    this.outputPop();
    this.cancelSpeak();
  };

  handleSettingsClick = () => {
    this.setState({ settingsOpen: true });
  };

  handleSettingsCancel = () => {
    this.setState({ settingsOpen: false });
  };

  handleBackClick = () => {
    const { previousBoard } = this.props;
    previousBoard();
  };

  handleSelectClick = () => {
    this.toggleSelectMode();
  };

  handleAddClick = () => {
    this.setState({ symbolDetailsOpen: true });
  };

  handleEditClick = () => {
    this.setState({ symbolDetailsOpen: true });
  };

  handleDeleteClick = () => {
    const { deleteSymbols, board } = this.props;
    this.setState({ selectedSymbols: [] });
    deleteSymbols(this.state.selectedSymbols, board.id);
  };

  handleSymbolDetailsCancel = () => {
    this.setState({ symbolDetailsOpen: false });
  };

  handleSymbolDetailsSubmit = symbol => {
    const { addSymbol, board } = this.props;
    addSymbol(symbol, board.id);
  };

  generateSymbols(symbols, boardId) {
    return Object.keys(symbols).map((id, index) => {
      const symbol = symbols[id];
      symbol.key = id;
      symbol.isSelected = this.state.selectedSymbols.includes(symbol.id);

      const { type, label, img, key, isSelected } = symbol;

      const symbolClasses = classNames({
        Symbol: true,
        'Symbol--folder': type === 'folder',
        'is-selected': isSelected
      });

      return (
        <button
          key={key}
          className={symbolClasses}
          onClick={() => {
            this.handleSymbolClick(symbol);
          }}
          ref={ref => this.symbolsRef[id] = ref}
        >
          {img &&
            <div className="Symbol__container">
              <img className="Symbol__image" src={img} alt="" />
            </div>}
          <div className="Symbol__label">
            <FormattedMessage id={label} />
          </div>
          {isSelected && <CheckCircleIcon className="CheckCircleIcon" />}
        </button>
      );
    });
  }

  convertMulberryToSymbols() {
    const allSymbols = [];

    for (let i = 0; i < mulberrySymbols.length; i += 1) {
      allSymbols.push({
        id: i,
        type: 'symbol',
        label: mulberrySymbols[i].id,
        img: mulberrySymbols[i].src
      });
    }
    return allSymbols;
  }

  render() {
    const { board, navigationHistory, dir } = this.props;
    const slicedSymbols = this.allSymbols.slice(
      this.state.sliceFrom,
      this.state.sliceTo
    );
    const symbols = this.generateSymbols(slicedSymbols, board.id);

    return (
      <div
        className={classNames(
          { 'is-selecting': this.state.isSelecting },
          'Board'
        )}
      >
        <Output
          className="Board__output"
          values={this.state.output}
          onClick={this.handleOutputClick}
          onClearClick={this.handleOutputClearClick}
          onBackspaceClick={this.handleOutputBackspaceClick}
          dir={dir}
        />

        <Toolbar className="Board__toolbar">
          <div className="Toolbar__group Toolbar__group--start" />
          <div className="Toolbar__group Toolbar__group--end">
            {this.state.isSelecting && <div />}

            <Button
              color="contrast"
              onClick={() => {
                this.setState(prevState => {
                  const from = prevState.sliceFrom + prevState.symbolsPerPage;
                  const to = from + prevState.symbolsPerPage;
                  return {
                    sliceFrom:
                      from >= this.allSymbols.length
                        ? prevState.sliceFrom
                        : from,
                    sliceTo:
                      to > this.allSymbols.length ? this.allSymbols.length : to
                  };
                });
              }}
            >
              NEXT
            </Button>
            <Button
              color="contrast"
              onClick={() => {
                this.state.sliceFrom &&
                  this.setState(prevState => {
                    const from = prevState.sliceFrom - prevState.symbolsPerPage;
                    const to = from + prevState.symbolsPerPage;
                    return {
                      sliceFrom:
                        from < 0
                          ? 0
                          : from,
                      sliceTo:
                        to < 0
                          ? 0 + prevState.symbolsPerPage
                          : to
                    };
                  });
              }}
            >
              PREV
            </Button>
            <IconButton color="contrast" onClick={this.handleSettingsClick}>
              <SettingsIcon />
            </IconButton>
          </div>
        </Toolbar>

        <div className="Board__symbols">
          <Grid id={board.id} edit={this.state.isSelecting}>
            {symbols}
          </Grid>
        </div>

        <SymbolDetails
          open={this.state.symbolDetailsOpen}
          onCancel={this.handleSymbolDetailsCancel}
          onSubmit={this.handleSymbolDetailsSubmit}
        />
        <Settings
          open={this.state.settingsOpen}
          onCancel={this.handleSettingsCancel}
        />
      </div>
    );
  }
}

Board.propTypes = {
  boards: PropTypes.object,
  className: PropTypes.string
};

Board.defaultProps = {
  className: ''
};

const mapStateToProps = state => {
  const {
    board: { boards, activeBoardId, navigationHistory },
    language: { dir }
  } = state;
  const board = boards.find(board => board.id === activeBoardId);

  return {
    board,
    navigationHistory,
    dir,
    speech
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeBoard: boardId => dispatch(changeBoard(boardId)),
    previousBoard: () => dispatch(previousBoard()),
    addSymbol: (symbol, boardId) => dispatch(addSymbol(symbol, boardId)),
    deleteSymbols: (symbols, boardId) =>
      dispatch(deleteSymbols(symbols, boardId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Board));
