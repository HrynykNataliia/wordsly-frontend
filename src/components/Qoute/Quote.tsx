import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { useSelector } from 'react-redux';
import { Header } from '../Header/Header';
import './Quote.scss';
import { quotaHub } from '../../api/apis';
import { initCookies, sendFileForTranslating } from '../../api/quota';
import { languagesSelectors } from '../../store/language';
import { Quota } from '../../types';

export const Quote: React.FC = () => {
  const languages = useSelector(languagesSelectors.getLanguages);
  const [quote, setQuote] = useState<Quota>();
  const [connection, setConnection] = useState<HubConnection>();
  const [quoteId, setQuoteId] = useState('');

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Information)
      .withUrl(quotaHub, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    (async () => {
      const newQuoteId = await initCookies();

      // eslint-disable-next-line no-console
      console.log(newQuoteId);
      setQuoteId(newQuoteId);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (connection && quoteId) {
        await connection.start();
        connection.on('updateQuota', (quota: Quota) => {
          // eslint-disable-next-line no-console
          console.log(quota);
          setQuote(quota);
        });
        await connection.invoke('Join', quoteId);
      }
    })();
  }, [connection, quoteId]);

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      const file = files[0];

      await sendFileForTranslating(file, quoteId);
    }
  };

  const handleDeleteLanguage = async (id: number) => {
    if (quote?.targetLanguages?.length) {
      await connection?.invoke(
        'SendTargetLanguageCodes',
        quoteId,
        quote.targetLanguages
          .filter(lang => lang.id !== id)
          .map(lang => lang.languageCode),
      );
    }
  };

  return (
    <div>
      <div className="quote__header">
        <Header />
      </div>

      <div className="quote__title">
        <span className="has-text-white has-text-weight-light is-size-4">
          Please give us a description of what you need by completing the following:
        </span>
      </div>

      <div className="quote__container">
        <div className="quote__inputs">
          <span className="has-text-white has-text-weight-light is-size-4">File for translation:</span>
          <div className="quote__input file has-name is-fullwidth is-medium is-right">
            <label htmlFor="file" className="file-label">
              <input
                id="file"
                onChange={handleFile}
                className="file-input is-rounded"
                type="file"
                name="resume"
              />

              <span className="file-cta">
                <span className="file-label">
                  Choose a file…
                </span>
              </span>

              <span className="file-name has-text-white">
                {quote?.fileName}
              </span>
            </label>
          </div>
        </div>

        <div className="quote__info">
          <div className="card">
            <header className="card-header">
              <h1 className="quote__info-header card-header-title">
                Order Details
              </h1>
            </header>
            <section className="card-content">
              <div className="content">
                <p>
                  {`File name: ${quote?.fileName || ''}`}
                </p>
                <p>
                  {`Subject field: ${quote?.subject?.subject || ''}`}
                </p>
                <p>
                  {`Transalte from: ${quote?.sourceLanguage?.language || ''}`}
                </p>
                <p>
                  {'Translate to: '}
                  {quote?.targetLanguages?.length && (
                    quote.targetLanguages.map(({ id }) => {
                      const selectedLanguage = languages.find(language => language.id === id);

                      return (
                        <span key={id} className="tag is-primary is-rounded">
                          {selectedLanguage?.language}
                          <button
                            type="button"
                            className="delete is-small"
                            onClick={() => handleDeleteLanguage(id)}
                          >
                          </button>
                        </span>
                      );
                    })
                  )}
                </p>
                <div className="quote__info-row">
                  <p className="quote__info-words">
                    {`Words count: ${quote?.wordsCount || ''}`}
                  </p>
                  <p>
                    {`Price ($): ${quote?.price || ''}`}
                  </p>
                </div>
              </div>
            </section>
            <footer className="card-footer">
              <button type="button" className="quote__info-button card-header-title card-footer-item">
                Save
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
